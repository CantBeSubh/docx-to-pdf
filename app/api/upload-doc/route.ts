export async function POST(req: Request) {
    try {

        const formData = await req.formData()
        const file = formData.get('file') as File
        const firstName = formData.get('firstName')
        const lastName = formData.get('lastName')
        const phone = formData.get('phone')
        // console.log(file)
        // File {
        //     name: 'Example Doc.docx',
        //     lastModified: 1714729999603,
        //     type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        //     size: 6730,
        //     Symbol(kHandle): Blob {},
        //     Symbol(kLength): 6730,
        //     Symbol(kType): 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        //   }
        console.log(firstName)
        console.log(lastName)
        console.log(phone)
        if (!file) return Response.json({ error: "No file provided" })

        // RETURN THE FILE
        return new Response(file, {
            headers: {
                "Content-Type": file.type,
                "Content-Disposition": `attachment; filename="${file.name}"`,
                "Content-Length": file.size.toString(),
            },
            status: 200,
        });
    }
    catch (error) {
        console.log(error)
        return Response.json({ error })
    }
}