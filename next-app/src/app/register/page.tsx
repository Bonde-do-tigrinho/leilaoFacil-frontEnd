'use client'
import { Button } from "@/components/Button";
import Field from "@/components/cadastro/Field";
import { IconArrowRight, IconBriefcase, IconEye, IconEyeClosed, IconLock, IconUser, IconWallet } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Logotipo from "@/components/layout/Logotipo";

import { cadastrarUsuario } from "@/services/userService";

export default function Cadastro(){
  const router = useRouter();
  const [nome, setNome] = useState("")
  const [cargo, setCargo] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [type, setType] = useState("password");
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState("");

  const toggleEye = () => {
    if (isEyeOpen) {
      setType("password");
      setIsEyeOpen(false);
    } else {
      setType("text");
      setIsEyeOpen(true);
    }
  };

  // 2. ATUALIZAR a função de cadastro
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }

    const userData = {
      nome,
      cargo,
      email,
      senha: password,
      tipoUsuario: tipoUsuario === "admin"
    };

    try {
      const response = await cadastrarUsuario(userData);
      toast.success("Usuário cadastrado com sucesso!");
      setTimeout(() => {
        router.push("/");
      }, 1500);

    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      const errorMessage = 
      (error as any).response?.data?.message || "Erro ao tentar cadastrar. Tente novamente.";
      toast.error(errorMessage);
    }
  };

  return(
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full h-screen flex justify-center md:grid grid-cols-2 bg-white">
        <article className="flex flex-col items-center justify-center gap-6">
          <form 
            onSubmit={(e) => {
              e.preventDefault(); 
              handleRegister();
            }} 
            className="w-[200px] md:w-[360px] xl:w-[400px] flex flex-col items-center justify-center gap-5 m-10"
          >
            <div className="w-full justify-center flex flex-col items-center gap-2">
                <div className="pb-3 md:hidden">
                  <Logotipo />
                </div>
              <h2 className="text-primary text-4xl font-semibold uppercase ">Cadastro</h2>
            </div>

            <Field title="Nome">
              <IconUser />
              <input
                type="text"
                placeholder="Digite o nome do usuário"
                onChange={(e) => setNome(e.target.value)}
                value={nome}
                required
                className="outline-none text-zinc-500 w-full"
              />
            </Field>

            <Field title="Cargo">
              <IconBriefcase />
              <input
                type="text"
                placeholder="Digite o cargo do usuário"
                onChange={(e) => setCargo(e.target.value)}
                value={cargo}
                required
                className="outline-none text-zinc-500 w-full"
              />
            </Field>

            <Field title="Email">
              <IconBriefcase /> 
              <input
                type="email"
                placeholder="Digite o email do usuário"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="outline-none text-zinc-500 w-full"
              />
            </Field>

            <Field title="Senha">
              <div className="flex flex-1 gap-1">
                <IconLock/>
                <input
                  type={type}
                  placeholder="Digite a senha de usuário"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="outline-none text-zinc-500 w-full"
                />
              </div>
              <button
                type="button"
                onClick={toggleEye}
                className="outline-none cursor-pointer"
              >
                {isEyeOpen ? <IconEye /> : <IconEyeClosed />}
              </button>
            </Field>

            <Field title="Confirmar Senha">
              <div className="flex flex-1 gap-1 ">
                <IconLock/>
                <input
                  type={type}
                  placeholder="Confirme a senha de usuário"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                  className="outline-none text-zinc-500 w-full"
                />
              </div>
              <button
                type="button"
                onClick={toggleEye}
                className="outline-none cursor-pointer"
              >
                {isEyeOpen ? <IconEye /> : <IconEyeClosed />}
              </button>
            </Field>

            <Field title="Tipo de usuario">
              <div className="flex flex-1 gap-1 w-3xl">
                <IconUser />
                <select
                  value={tipoUsuario}
                  onChange={(e) => setTipoUsuario(e.target.value)}
                  required
                  className="outline-none text-zinc-500 w-full cursor-pointer"
                >
                  <option value="">Selecione o tipo de usuário</option>
                  <option value="admin">Administrador</option>
                  <option value="user">Usuário</option>
                </select>
              </div>
            </Field>

            <Button
              type="submit"
              variant="primary"
              size="full"
            >
              <p className="text-xl font-semibold">{"Cadastrar"}</p>
            </Button>
            
          </form>
        </article>
        
        <article className="hidden md:flex flex-col items-center justify-center pb-40 bg-[url('/img/background-register.png')] bg-no-repeat bg-center">
          <div className="flex flex-col justify-center items-center md:w-[300px] lg:w-[400px] xl:w-[500px] text-center">
            <Image
              src="/img/logo.png"
              alt="Logotipo"
              width={100}
              height={100}
            />
            <h1 className="text-white font-semibold text-2xl lg:text-4xl mt-6">
              <p>Bem-vindo ao nosso buscador de leilões!</p>
            </h1>
            <p className="text-zinc-200 text-lg mt-2">
              Encontre imóveis com facilidade e eficiência
            </p>
          </div>
        </article>
      </div>
    </>
  )
}