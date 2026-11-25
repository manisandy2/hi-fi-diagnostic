/**
 * Information data for the 3D blood collection workflow components.
 * Fictional demonstration data only. No medical claims are made.
 */
export const workflowComponents = [
  {
    id: "patient-arm",
    name: "Patient Arm",
    description:
      "Stylized arm positioned at the illustration site — educational model, not a real patient.",
    modelType: "Educational model",
    material: "Illustrative",
  },
  {
    id: "collection-needle",
    name: "Collection Needle",
    description:
      "Gauge-style needle that penetrates the collection site and guides the sample into the tube (illustrative). No real-world insertion guidance is given.",
    modelType: "Illustrative",
    material: "Illustrative metal",
  },
  {
    id: "needle-holder",
    name: "Needle Holder",
    description:
      "Table-mounted clamp holding the needle in place during collection (illustrative prop).",
    modelType: "Illustrative",
    material: "Illustrative plastic",
  },
  {
    id: "blood-flow",
    name: "Blood Flow",
    description:
      "Animated red flow path representing the movement of the collected sample through the collection system (educational visualization).",
    modelType: "Educational visualization",
    material: "Illustrative red",
  },
  {
    id: "filling-tube",
    name: "Filling Tube",
    description:
      "Transparent collection tube; the animated red level shows the sample filling it.",
    modelType: "Transparent glass-like",
    material: "Glass-like polymer",
  },
  {
    id: "tube-cap",
    name: "Tube Cap",
    description:
      "Sealing cap on the tube top (illustrative Vacutainer-style system; the needle passes through the cap's hole).",
    modelType: "Illustrative plastic",
    material: "Blue plastic",
  },
  {
    id: "storage-rack",
    name: "Storage Rack",
    description:
      "Holds the completed sample; the filled tube is placed in an available rack slot. Storage conditions are not shown.",
    modelType: "Rack frame",
    material: "Illustrative blue",
  },
  {
    id: "sample-label",
    name: "Sample Label",
    description:
      "Demonstration label with fictional specimen data shown on the collected tube.",
    modelType: "Paper label",
    material: "White label",
  },
  {
    id: "filled-tube",
    name: "Filled Tube",
    description:
      "The completed, filled collection tube in storage (the stored specimen).",
    modelType: "Transparent glass-like",
    material: "Glass-like polymer",
  },
];

export const getWorkflowComponent = (id) =>
  workflowComponents.find((component) => component.id === id);
