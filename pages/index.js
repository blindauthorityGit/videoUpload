// pages/index.js
import Head from "next/head";
import UploadVideo from "../components/uploadVideo";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Video Upload</title>
            </Head>
            <main className="container mx-auto pt-24">
                <h1 className="font-bold mb-6">Upload Video</h1>
                <UploadVideo />
            </main>
        </div>
    );
}
