export interface StepProps {
    step: string;
    title: string;
    detail: string;
    button: {
        title: string,
        link: string
    }
}

export interface ContentListProps {
    content: StepProps;
}
