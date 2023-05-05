const a: string = "sldkjf";

function getFullName(firstname: string, lastname: string): string {
    return `${firstname} ${lastname}`
}

console.log(getFullName("sldkjf", "sldfj"))

const user: [number, string, ...boolean[]] = [1, 'slkdjf', true, true, false]


//my work
enum Status {
    'published',
    'draft',
    'deleted'
}

async function getFaqs(req: {topicId: number, status: Status}): Promise<{
    question: string,
    answer: string,
    tags: string[],
    likes: number,
    status: Status
}[]> {
    const res = await fetch('/faqs', {
        method: "POST",
        body: JSON.stringify(req)
    })
    const data = await res.json();
    return data
}