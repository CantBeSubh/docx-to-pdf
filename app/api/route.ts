export function GET() {
    console.log("GET");
    return Response.json({ message: "Hello World" })
}