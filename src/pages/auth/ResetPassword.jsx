import React from 'react'
import Container from '../../components/layouts/Container'
import Logo from '../../components/shared/Logo'
import SectionHeading from '../../components/shared/SectionHeading'
import ResetPasswordForm from '../../components/form/ResetPasswordForm'
import AuthAside from '../../components/shared/AuthAside'

export default function ResetPassword() {
  return (
    <Container className="lg:flex items-center">
      <div className="lg:fixed lg:inset-y-0 lg:left-0 lg:z-10 lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:px-10 xl:px-16">
        <div className="mx-auto w-full md:max-w-97.5 lg:max-w-97.5">
          <Logo />

          <SectionHeading
            className="mb-6 mt-2"
            title="Reset Password!"
            subTitle="Enter your new password below."
          />

          <ResetPasswordForm />
        </div>
      </div>

      <AuthAside
        eyebrow="A fresh start"
        title="Choose a password that feels right."
        description="You are almost there. Set a new password to keep your account secure and get back to the beauty picks you love."
        note="A secure account means more peace of mind, every time you shop."
      />
    </Container>
  )
}
