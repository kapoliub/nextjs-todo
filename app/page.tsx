import { deleteUser } from "@/auth";
import { Button } from "@heroui/button";

export default function Home() {
  return (
    <section className="">
      Welcome to Todo list app
      <Button onPress={deleteUser}>deleteUser</Button>
    </section>
  );
}
