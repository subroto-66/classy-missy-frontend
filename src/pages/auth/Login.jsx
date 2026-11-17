import React from 'react'
import Container from '../../components/layouts/Container'
import Logo from '../../components/shared/Logo'
import UserLoginForm from '../../components/form/UserLoginForm'
import SectionHeading from '../../components/shared/SectionHeading'
import AuthAside from '../../components/shared/AuthAside'

export default function Login() {

  return (
     <Container className="lg:flex items-center">
      <div className="lg:fixed lg:inset-y-0 lg:left-0 lg:z-10 lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:px-10 xl:px-16">
        <div className="mx-auto w-full md:max-w-97.5 lg:max-w-97.5">
          <Logo />
          <SectionHeading
            className="mb-6 mt-2"
            title="Login Account!"
            subTitle="Welcome back login your account."
          />
          <UserLoginForm/>
        </div>
      </div>

      <AuthAside
        eyebrow="Welcome back"
        title="Your next favorite find is waiting."
        description="Sign in to pick up where you left off, discover new arrivals, and keep your beauty favorites close."
        note="Good to see you again. Your personal beauty edit is just around the corner."
      />
    </Container>
  )
}
