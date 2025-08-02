import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
    name: z.string().min(2, { message: 'Must be 2 charachter' }),
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(5, { message: "Password must be at least 5 characters long" }),
    confirmPassword: z.string()
}).refine((data) => data.password == data.confirmPassword, {
    message: "password ❌ match",
    path: ["confirmPassword"],
})



export default function ZodForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = (data) => {
        console.log('Form Submitted:', data)
        alert('Form submitted successfully!')
    }


    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Name:</label><br />
                    <input {...register("name")} />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>Email:</label><br />
                    <input type="email" {...register("email")} />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>Password:</label><br />
                    <input type="text" {...register("password")} />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="confirmPassword">Confirm Password:</label><br />
                    <input type="password" id="confirmPassword" {...register("confirmPassword")} />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
