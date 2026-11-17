import VerifyCodeForm from "../../components/form/VerifyCodeForm";
import Container from "../../components/layouts/Container";
import Logo from "../../components/shared/Logo";
import SectionHeading from "../../components/shared/SectionHeading";
import AuthAside from "../../components/shared/AuthAside";


export default function VerifyCode() {
  return (
    <Container className="lg:flex items-center">
      <div className="lg:fixed lg:inset-y-0 lg:left-0 lg:z-10 lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:px-10 xl:px-16">
        <div className="mx-auto w-full md:max-w-87.5 lg:max-w-97.5">
          <Logo />

          <SectionHeading
            className="mb-6 mt-2"
            title="Verify OTP!"
            subTitle="Check your email for the OTP."
          />

          <VerifyCodeForm />
        </div>
      </div>

      <AuthAside
        eyebrow="One quick step"
        title="Your security is always in style."
        description="Confirm it is really you with the code we sent. Once verified, you can continue with confidence."
        note="Never share your verification code with anyone."
      />
    </Container>
  );
}
