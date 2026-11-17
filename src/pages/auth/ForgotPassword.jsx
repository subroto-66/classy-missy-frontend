import React from 'react'
import Container from '../../components/layouts/Container'
import Logo from '../../components/shared/Logo'
import SectionHeading from '../../components/shared/SectionHeading'
import UserForgotPasswordForm from '../../components/form/UserForgotPassowrdForm'
import AuthAside from '../../components/shared/AuthAside'

export default function ForgotPassword() {
  return (
     <Container className="lg:flex items-center">
      <div className="lg:fixed lg:inset-y-0 lg:left-0 lg:z-10 lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:px-10 xl:px-16">
        <div className="mx-auto w-full md:max-w-97.5 lg:max-w-97.5">
          <Logo />

          <SectionHeading
            className="mb-6 mt-2"
            title="Forgot Password!"
            subTitle="Enter your email and get code"
          />

          <UserForgotPasswordForm />
        </div>
      </div>

      <AuthAside
        eyebrow="Here to help"
        title="A small reset, then back to you."
        description="Forgot your password? It happens. Follow a few simple steps and we will help you securely get back into your account."
        note="Your account stays protected while we help you find your way back."
      />
    </Container>
  )
}
