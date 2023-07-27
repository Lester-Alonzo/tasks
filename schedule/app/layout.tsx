import "./globals.css"
import { Poppins } from "next/font/google"
import { GeneralProvider } from "@/lib/context/genralContext"
import { BubbleProvider } from "@/lib/context/Bubble"
import { TableContextProvider } from "@/lib/context/tableContext"
import { DocProvider } from "@/lib/context/DocContext"
import { Bubble } from "./Bubble"

const inter = Poppins({
  subsets: ["latin-ext"],
  weight: ["400", "700", "800"]
})

export const metadata = {
  title: "ToDos",
  description: "All my ToDos of the day"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <GeneralProvider>
        <BubbleProvider>
          <TableContextProvider>
            <DocProvider>
              <body className={inter.className}>
                <Bubble />
                {children}
              </body>
            </DocProvider>
          </TableContextProvider>
        </BubbleProvider>
      </GeneralProvider>
    </html>
  )
}
