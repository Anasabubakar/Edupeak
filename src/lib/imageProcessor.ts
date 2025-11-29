// Mock image processor for Cortex AI
// In a real app, this would call an API like OpenAI Vision or Google Cloud Vision

export async function describeImage(file: File): Promise<string> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Return a mock description based on file name or random selection
    // This allows us to "test" different scenarios by naming files differently
    const name = file.name.toLowerCase();

    if (name.includes("graph") || name.includes("chart")) {
        return "The image shows a line graph depicting an upward trend in supply and demand equilibrium over time.";
    }

    if (name.includes("code") || name.includes("snippet")) {
        return "The image contains a code snippet in Python defining a recursive function for calculating Fibonacci numbers.";
    }

    if (name.includes("diagram") || name.includes("architecture")) {
        return "The image illustrates a system architecture diagram with a client-server model, including a load balancer and database cluster.";
    }

    if (name.includes("math") || name.includes("equation")) {
        return "The image displays a quadratic equation: ax^2 + bx + c = 0, along with the quadratic formula for solving it.";
    }

    return "The image appears to be a visual reference related to the study topic. It contains text and graphical elements.";
}
