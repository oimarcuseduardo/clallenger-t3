"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Container, Input, Textarea } from "@commons/components";
import { api } from "chl/trpc/react";
import { InputError, STATUS_PUBLICATION, type EventType } from "@commons/types";
import { Validate, type RulesValidation } from "@helpers";
import { STATUS_PUBLICATIONS } from "@prisma/client";
import { useRouter } from "next/navigation";

const Adicionar = () => {
  const [, setForm] = useState<EventType>({
    title: '',
    date: new Date(),
    description: '',
    status: STATUS_PUBLICATION.PUBLIC,
    address: ''
  });
  const [errors, setErrors] = useState<Array<InputError>>([]);
  const utils = api.useUtils();
  const routes = useRouter();

  const createEvent = api.event.create.useMutation({
    onSuccess: async () => {
      await utils.event.invalidate();
    },
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, required, minLength } = e.currentTarget;
    switch (name) {
      case "title":
        if (required && !value) {
          setErrors((e) => [
            ...e,
            {
              field: "title",
              error: "O preenchimento deste campo é obrigatório.",
            },
          ]);
        } else {
          setErrors((e) => e.filter((item) => item.field !== name));
          setForm((f) => ({ ...f, [name]: value }));
        }
        if (value.length < minLength) {
          setErrors((e) => [
            ...e,
            { field: "title", error: "É necessário ao menos 3 caractéres" },
          ]);
        } else {
          setErrors((e) => e.filter((item) => item.field !== name));
          setForm((f) => ({ ...f, [name]: value }));
        }
        break;
      case "date":
        if (required && !value) {
          setErrors((e) => [
            ...e,
            {
              field: "date",
              error: "O preenchimento deste campo é obrigatório.",
            },
          ]);
        } else {
          setErrors((e) => e.filter((item) => item.field !== name));
          setForm((f) => ({ ...f, [name]: new Date(value) }));
        }
        break;
      case "address":
        if (required && !value) {
          setErrors((e) => [
            ...e,
            {
              field: "address",
              error: "O preenchimento deste campo é obrigatório.",
            },
          ]);
        } else {
          setErrors((e) => e.filter((item) => item.field !== name));
          setForm((f) => ({ ...f, [name]: value }));
        }

        break;
      case "description":
        if (required && !value) {
          return setErrors((e) => [
            ...e,
            {
              field: "description",
              error: "O preenchimento deste campo é obrigatório.",
            },
          ]);
        } else {
          setErrors((e) => e.filter((item) => item.field !== name));
          setForm((f) => ({ ...f, [name]: value }));
        }

        break;
      case "status":
        if (required && !value) {
          return setErrors((e) => [
            ...e,
            {
              field: "status",
              error: "O preenchimento deste campo é obrigatório.",
            },
          ]);
        } else {
          setErrors((e) => e.filter((item) => item.field !== name));
          setForm((f) => ({ ...f, [name]: STATUS_PUBLICATION.PUBLIC }));
        }

        break;
      default:
        break;
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = {} as any;

    formData.forEach((value, key) => {
      formValues[key] = value;
    });
    createEvent.mutate({
      title: formValues.title,
      date: new Date(formValues.date),
      content: formValues.description,
      address: formValues.address});
    routes.push('/');
    e.preventDefault();
  };
  return (
    <Container className="relative mt-12 flex w-4/5 flex-col bg-gray-100 px-10 py-8 ring-gray-100">
      <h1 className="text-3xl font-extrabold">Criar um evento</h1>
      <small>É hora de criar um evento</small>
      <hr className="bottom-1 mb-4 mt-4 border-collapse border-solid border-pink-400" />
      <Container className="grid w-full auto-cols-auto grid-flow-row">
        <form onSubmit={handleSubmit}>
          <div className="mb-8 flex w-full flex-col">
            <div className="font-sans text-base font-semibold text-pink-400">
              Nome do evento
            </div>
            <div className="mt-3 w-full">
              <Input
                type="text"
                name="title"
                required
                id="title"
                onChange={handleChange}
                placeholder="Nome do evento"
                className="w-full px-3 py-3 text-sm font-extralight"
                minLength={3}
                error={errors.filter((e) => e.field === "title")[0]?.error}
              />
            </div>
          </div>
          <div className="mb-8 flex w-full flex-col">
            <div className="font-sans text-base font-semibold text-pink-400">
              Data do evento
            </div>
            <div className="mt-3 w-full">
              <Input
                type="datetime-local"
                name="date"
                required
                onChange={handleChange}
                id="date"
                placeholder="Data do evento"
                className="w-full px-3 py-3 text-sm font-extralight"
                error={errors.filter((e) => e.field === "date")[0]?.error}
              />
            </div>
          </div>
          <div className="mb-8 flex w-full flex-col">
            <div className="font-sans text-base font-semibold text-pink-400">
              Endereço
            </div>
            <div className="mt-3 w-full">
              <Input
                type="text"
                name="address"
                required
                id="address"
                onChange={handleChange}
                placeholder="Onde será realizado o evento?"
                className="w-full px-3 py-3 text-sm font-extralight"
                error={errors.filter((e) => e.field === "address")[0]?.error}
              />
            </div>
          </div>
          <div className="mb-8 flex w-full flex-col">
            <div className="font-sans text-base font-semibold text-pink-400">
              Descrição
            </div>
            <div className="mt-3 w-full">
              <Textarea
                name="description"
                id="description"
                onChange={handleChange}
                required
                placeholder="Descreva o evento com a maior quantidade de detalhes poss[ivel"
                className="w-full px-3 py-3 text-sm font-extralight"
                error={
                  errors.filter((e) => e.field === "description")[0]?.error
                }
              />
            </div>
          </div>
          <div className="mb-8 flex w-full flex-col">
            <div className="font-sans text-base font-semibold text-pink-400">
              Deseja publicar o evento?
            </div>
            <div className="mt-3 flex w-3 flex-col">
              <div className="flex flex-row content-between">
                <Input
                  type="radio"
                  name="status"
                  id="status"
                  onChange={handleChange}
                  placeholder="Descreva o evento com a maior quantidade de detalhes poss[ivel"
                  className="text-sm font-extralight"
                  value="Sim"
                  defaultChecked
                />{" "}
                <div className="ml-1">Sim</div>
              </div>
              <div className="flex flex-row">
                <Input
                  type="radio"
                  name="status"
                  id="status"
                  onChange={handleChange}
                  placeholder="Descreva o evento com a maior quantidade de detalhes poss[ivel"
                  className="text-sm font-extralight"
                  value="Não"
                />{" "}
                <div className="ml-1">Não</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row content-center justify-center">
            <div className="w-6/12">
              <button className="w-full rounded-lg bg-rose-500 px-5 py-5 text-white">
                Criar evento
              </button>
            </div>
          </div>
        </form>
      </Container>
    </Container>
  );
};

export default Adicionar;
