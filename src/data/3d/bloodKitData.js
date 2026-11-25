
export const bloodKitComponents = [
  {
    id: "tube-cap",
    name: "Tube Cap",
    description:
      "The cap closes the collection tube and helps protect the sample from contamination.",
    material: "Medical-grade plastic",
    color: "Blue",
  },
  {
    id: "collection-tube",
    name: "Collection Tube",
    description:
      "The transparent tube is used to hold a collected blood sample.",
    material: "Illustrative transparent polymer",
    color: "Transparent",
  },
  {
    id: "blood-sample",
    name: "Blood Sample",
    description:
      "The red liquid represents a blood sample for educational visualization.",
    material: "Illustrative sample",
    color: "Red",
  },
  {
    id: "tube-holder",
    name: "Tube Holder",
    description:
      "The holder supports the collection tube in an upright position.",
    material: "Illustrative medical-grade plastic",
    color: "Blue and white",
  },
];

export const getBloodKitComponent = (id) =>
  bloodKitComponents.find((component) => component.id === id);
