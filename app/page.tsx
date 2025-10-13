import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { Button } from "@heroui/button";
import { deleteUser, getUser, signOut } from "@/auth";

export default function Home() {
  return (
    <section className="">
      Welcome to Todo list app
      {/* <Button onPress={deleteUser}>deleteUser</Button> */}
    </section>
  );
}
