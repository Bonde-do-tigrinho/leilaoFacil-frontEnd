"use client";
import { IconArrowLeft } from "@tabler/icons-react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/login/AuthForm";
import ModalForm from "@/components/login/ModalForm";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from '@/context/AuthContext';

import { login, trocarSenha } from '@/services/userService';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mode, setMode] = useState("login");
  const { signIn } = useAuth();
  
  // State para o modal de sucesso
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);

  const forgotPasswordMode = () => setMode("forgotPassword");
  const loginMode = () => setMode("login");
  const back = () => setMode("login");
  const closeModal = () => setIsPasswordChecked(false);

  // 2. FUNÇÃO DE LOGIN ATUALIZADA
  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      const { token, message } = response.data;
      
      if (token) {
        signIn(token);
        toast.success(message || "Login realizado com sucesso!");
        router.push("/buscador");
      } else {
        toast.error(message || "Resposta inválida do servidor.");
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      const errorMessage = error.response?.data?.message || "Email ou senha inválidos.";
      toast.error(errorMessage);
    }
  };
  
  // 3. FUNÇÃO DE TROCAR SENHA ATUALIZADA E SIMPLIFICADA
  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      return toast.error("As senhas não coincidem!");
    }
    
    try {
      const response = await trocarSenha({ email, novaSenha: password });
      toast.success(response.data.message || "Senha alterada com sucesso!");
      setIsPasswordChecked(true); // Abre o modal de sucesso
    } catch (error: any) {
      console.error("Erro ao alterar a senha:", error);
      const errorMessage = error.response?.data?.message || "Não foi possível alterar a senha.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full h-screen flex justify-center md:grid grid-cols-2 bg-white">
        <article className="hidden md:flex flex-col items-center justify-center pb-40 bg-[url('/img/background-image.png')] bg-no-repeat bg-center">
          {/* ... seu JSX da imagem de fundo ... */}
        </article>

        <article
          className={`flex flex-col items-center justify-center gap-6 ${
            mode === "login" ? " " : "pb-40"
          }`}
        >
          <div
            className={`${
              mode === "login"
                ? "hidden"
                : "w-full flex items-center justify-start md:px-8 lg:px-10"
            }`}
          >
            <button
              onClick={back}
              type="button"
              className="text-zinc-500 hover:text-zinc-600 flex items-center gap-2 cursor-pointer transition-colors duration-20 pt-10"
            >
              <IconArrowLeft />
              <p className="">Voltar</p>
            </button>
          </div>

          <AuthForm
            mode={mode}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            forgotPasswordMode={forgotPasswordMode}
            handleLogin={handleLogin}
            isEmailCheck={false}
            emailChecked={() => {}}
            changePassword={handleChangePassword}
          />
        </article>
      </div>

      {isPasswordChecked &&
        ReactDOM.createPortal(
          <ModalForm back={back} closeModal={closeModal} />,
          document.body
        )}
    </>
  );
}