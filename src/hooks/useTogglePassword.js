import { useState } from "react";

export const useTogglePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggle = () => setShowPassword((prev) => !prev);

  return { showPassword, toggle };
};