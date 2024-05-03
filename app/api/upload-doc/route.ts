import { patchDocument, PatchType, TextRun } from "docx";

const patchDoc = async (file: File, firstName: string, lastName: string, phone: string) => {
    const buffer = await file.arrayBuffer()
    const doc = await patchDocument(buffer, {
        patches: {
            f_name: {
                type: PatchType.PARAGRAPH,
                children: [new TextRun(firstName)],
            },
            l_name: {
                type: PatchType.PARAGRAPH,
                children: [new TextRun(lastName)],
            },
            phone: {
                type: PatchType.PARAGRAPH,
                children: [new TextRun(phone)],
            },
        },
        keepOriginalStyles: true,
    })
    return new File([doc], "updated_document.docx", { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" })
}

export async function POST(req: Request) {
    try {

        const formData = await req.formData()
        const file = formData.get('file') as File
        const firstName = formData.get('firstName') as string
        const lastName = formData.get('lastName') as string
        const phone = formData.get('phone') as string
        console.log(file)
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

        const new_file = await patchDoc(file, firstName, lastName, phone)
        console.log(new_file)

        // RETURN THE FILE
        return new Response(new_file, {
            headers: {
                "Content-Type": new_file.type,
                "Content-Disposition": `attachment; filename="${new_file.name}"`,
                "Content-Length": new_file.size.toString(),
            },
            status: 200,
        });
    }
    catch (error) {
        console.log(error)
        return Response.json({ error })
    }
}