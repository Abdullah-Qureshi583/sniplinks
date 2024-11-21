import Home from "@/components/Home";
const a = process.env.NEXTAUTH_SECRET
console.log("the auth secret is " + a)
export default function Component() {
  return (
    <>
      <Home />
    </>
  );
}
