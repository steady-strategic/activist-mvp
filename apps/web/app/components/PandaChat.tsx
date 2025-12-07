type ChatSectionBlock = BlockBase & {
  type: "chatSection";
  props: {
    botName: string;          // e.g. "Panda Guardian"
    initialMessage: string;   // first system message displayed to user
    systemInstruction: string; // prompt used by the backend model

    // Optional headings for the static intro section
    heading?: string;         // displayed as section title
    subheading?: string;      // small descriptive line
  };
};
