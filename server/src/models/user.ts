import { getModelForClass, modelOptions, pre, prop } from "@typegoose/typegoose";
import bcrypt from 'bcrypt'
import chalk from "chalk";

@pre<User>('save', async function () {
    try {
        this.password = await bcrypt.hash(this.password, 12)
        console.log(`${chalk.bgBlue('Password bcrypt is done!')}`)
    } catch (error) {
        console.log(`${chalk.bgGreen(error)}`)
    }
})

@modelOptions({schemaOptions: {timestamps: true}})
export class User{
    public _id?: string

    @prop({required: true})
    public firstName!: string

    @prop({required: true})
    public lastName!: string

    @prop({required: true, unique: true})
    public phoneNumber!: string

    @prop({required: true, unique: true})
    public email!: string

    @prop({required: true})
    public password!: string

    @prop({required: false, default: 'https://imageupload.io/ib/3oXStgvAko9IBAp_1693943124.png'})
    public avatar!: string

    @prop({ required: true, default: false })
    public isAdmin!: boolean
}

export const UserModel = getModelForClass(User)