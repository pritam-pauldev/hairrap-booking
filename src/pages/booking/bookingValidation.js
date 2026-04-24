export function validateBookingForm(form, agreed) {
  const e = {};
  if (!form.firstName.trim()) e.firstName = "Required";
  if (!form.lastName.trim()) e.lastName = "Required";
  if (!form.email.includes("@")) e.email = "Valid email required";
  if (!form.phone.trim()) e.phone = "Required";
  if (!form.date) e.date = "Select a date";
  if (!form.time) e.time = "Select a time slot";
  if (!agreed) e.agreed = "You must agree to the terms";
  return e;
}
