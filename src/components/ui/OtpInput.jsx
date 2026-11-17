
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Label from "./Label";
import { cn } from "../../lib/utlis";


const OTPInput = forwardRef(
  (
    {
      length = 6,
      value = "",
      onChange,
      label = "OTP",
      required = false,
      disabled = false,
      className,
      error,
    },
    ref
  ) => {
    const [otp, setOtp] = useState(
      Array.from({ length }, (_, index) => value[index] || "")
    );

    const inputRefs = useRef([]);

    useImperativeHandle(ref, () => inputRefs.current);

    useEffect(() => {
      const newOtp = Array.from(
        { length },
        (_, index) => value[index] || ""
      );

      setOtp(newOtp);
    }, [value, length]);

    const updateOtp = (newOtp) => {
      setOtp(newOtp);
      onChange?.(newOtp.join(""));
    };

    const handleChange = (e, index) => {
      const digit = e.target.value.replace(/\D/g, "").slice(-1);

      const newOtp = [...otp];
      newOtp[index] = digit;

      updateOtp(newOtp);

      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace") {
        if (otp[index]) {
          const newOtp = [...otp];
          newOtp[index] = "";
          updateOtp(newOtp);
        } else if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }

        return;
      }

      if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
        return;
      }

      if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
        return;
      }

      // Allow Ctrl + V / Cmd + V
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v") {
        return;
      }

      if (!/^\d$/.test(e.key) && !["Tab", "Delete"].includes(e.key)) {
        e.preventDefault();
      }
    };

    const handlePaste = (e, index) => {
      e.preventDefault();
      e.stopPropagation();

      const clipboardText = e.clipboardData.getData("text/plain");

      const digits = clipboardText.replace(/\D/g, "").slice(0, length);

      if (!digits) return;

      const newOtp = Array.from(
        { length },
        (_, i) => digits[i] || ""
      );

      setOtp(newOtp);
      onChange?.(newOtp.join(""));

      requestAnimationFrame(() => {
        inputRefs.current[
          Math.min(digits.length, length - 1)
        ]?.focus();
      });
    };

    return (
      <div className="w-full">
        {label && <Label required={required}>{label}</Label>}

        <div
          className={cn(
            "flex justify-between items-center gap-2",
            className
          )}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              disabled={disabled}
              placeholder="0"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e, index)}
              className={cn(
                "h-11 w-12 rounded-md text-input-text px-2 bg-input-background text-center text-base",
                "font-medium",
                "placeholder:text-input-placeholder",
                "transition-all duration-200",
                "border border-input-border",
                "focus:border-input-active-border",
                "focus:outline-none",
                "focus:ring-2 focus:ring-input-active-ring",
                disabled &&
                  "cursor-not-allowed bg-input-disabled-background opacity-60"
              )}
            />
          ))}
        </div>

        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

OTPInput.displayName = "OTPInput";

export default OTPInput;
