import React from 'react'
import SectionHeading from '../../components/shared/SectionHeading'
import Logo from '../../components/shared/Logo'
import Container from '../../components/layouts/Container'
import UserRegisterForm from '../../components/form/UserRegisterForm'
import AuthAside from '../../components/shared/AuthAside'

export default function Register() {
  return (
    <Container className="lg:flex items-center">
      <div className="lg:fixed lg:inset-y-0 lg:left-0 lg:z-10 lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:px-10 xl:px-16">
        <div className="mx-auto w-full md:max-w-97.5 lg:max-w-97.5">
          <Logo />
          <SectionHeading
            className="mb-6 mt-2"
            title="Create Account!"
            subTitle="Welcome create your account."
          />
          <UserRegisterForm/>
        </div>
      </div>
      <AuthAside
        eyebrow="A lovely place to begin"
        title="Make room for a little more you."
        description="Create your account and explore thoughtfully chosen beauty, new discoveries, and everyday essentials picked with care."
        note="Join us and make your next beauty find feel personal."
      />
    </Container>
  )
}
