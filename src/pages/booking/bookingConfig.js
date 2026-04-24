import { format, addDays } from "date-fns";

export const PERSONAL_FIELDS = [
  { key: "firstName", label: "First Name", placeholder: "Enter First Name" },
  { key: "lastName", label: "Last Name", placeholder: "Enter Last Name" },
  { key: "email", label: "Email", placeholder: "Enter your Email" },
  { key: "phone", label: "Phone", placeholder: "Enter Phone Number" },
];

export function generateDateOptions() {
  return Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));
}

export function getSelectFields(service, STYLISTS) {
  return [
    {
      key: "stylist",
      label: "Choose Stylist",
      options: [
        { value: "", label: "Select Stylist" },
        ...STYLISTS.map((s) => ({ value: s.id, label: s.name })),
      ],
    },
    {
      key: "gender",
      label: "Gender",
      options: [
        { value: "", label: "Select Gender" },
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
      ],
    },
    {
      key: "serviceType",
      label: "Service Type",
      options: [
        { value: "", label: service.name },
        { value: "mens-haircut", label: "Men's Haircut" },
        { value: "womens-haircut", label: "Women's Haircut" },
      ],
    },
    {
      key: "serviceCategory",
      label: "Service Category",
      options: [{ value: service.category, label: service.category }],
    },
  ];
}

export const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  stylist: "",
  serviceType: "",
  date: "",
  time: "",
  message: "",
};
