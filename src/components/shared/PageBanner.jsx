export default function PageBanner({ eyebrow, title, description, image, alt }) {
  return (
    <div className="relative isolate flex min-h-56 items-center overflow-hidden rounded-2xl bg-background-secondary px-5 py-9 sm:min-h-64 sm:px-10 lg:px-14">
      <div className="absolute inset-y-0 right-0 z-0 w-2/3 sm:w-1/2">
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background-secondary via-background-secondary/75 to-transparent" />
      </div>
      <div className="relative z-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-secondary">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-foreground-secondary sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
