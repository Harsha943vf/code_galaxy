import mongoose from "mongoose"
import bcryptjs from "bcryptjs"

export interface IUser extends mongoose.Document {
    username: string
    email: string
    password: string
    comparePassword(password: string): Promise<boolean>
}

const userSchemaObject = {
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
        select: false,
    },
} as const

type UserSchemaType = typeof userSchemaObject

const userSchema = new mongoose.Schema<any>(userSchemaObject, {
    timestamps: true,
})

// Hash password before saving
userSchema.pre("save", async function (this: any) {
    if (!this.isModified("password")) {
        return
    }

    try {
        const salt = await bcryptjs.genSalt(10)
        this.password = await bcryptjs.hash(this.password, salt)
    } catch (error) {
        throw error
    }
})

// Compare password method
userSchema.methods.comparePassword = async function (this: any, password: string): Promise<boolean> {
    return await bcryptjs.compare(password, this.password)
}

// @ts-ignore - mongoose type issue
export default mongoose.model<IUser>("User", userSchema)
