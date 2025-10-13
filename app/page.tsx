import { Button } from "@heroui/button";

import { deleteUser } from "@/auth";

export default function Home() {
  return (
    <section className="">
      Welcome to Todo list app
      <Button onPress={deleteUser}>deleteUser</Button>
    </section>
  );
}
