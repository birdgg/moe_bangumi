import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page(): JSX.Element {
  return (
    <main className="">
      <div className="fixed w-full py-5 bg-blue-500"></div>
      <div className="flex flex-row h-[200px] pt-[40px]">
        <div className="h-full w-[30px] bg-pink-300"></div>
        <div className="flex-1 grid grid-cols-4 gap-4">
          {[1, 2, 3].map((item, index) => (
            <Card className="w-[300px]">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
