"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Container, Input, Textarea } from "@commons/components";
import { api } from "chl/trpc/react";
import { InputError, STATUS_PUBLICATION, type EventType } from "@commons/types";
import { Validate, type RulesValidation } from "@helpers";
import { STATUS_PUBLICATIONS } from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    idEvento: string;
  };
};

const Editar = (props: Props) => {
  const [form, setForm] = useState<EventType>({
    title: '',
    date: new Date(),
    description: '',
    status: STATUS_PUBLICATION.PUBLIC,
    address: ''
  });
  const [errors, setErrors] = useState<Array<InputError>>([]);
  const utils = api.useUtils();
  const routes = useRouter();

  const event = api.event.event.useQuery({ id: Number(props.params.idEvento) });

  const { data, isLoading } = event;

  const upateEvent = api.event.update.useMutation({
    onSuccess: async () => {
      await utils.event.invalidate();
    },
  });
  const deleteEvent = api.event.deleteEvent.useMutation({
    onSuccess: async () => {
      await utils.event.invalidate();
      routes.push(`/`)
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
    upateEvent.mutate({
      id: Number(props.params.idEvento),
      title: formValues.title,
      date: new Date(formValues.date),
      content: formValues.description,
      address: formValues.address
    });
    routes.push('/');
    e.preventDefault();
  };
  const handlerDelete = (id: number) => {
    deleteEvent.mutate(Number(props.params.idEvento));
  }
  return (
    <Container className="relative mt-12 flex w-4/5 flex-col bg-gray-100 px-10 py-8 ring-gray-100">
      <h1 className="text-3xl font-extrabold">Editar evento - {data?.title}
      <button className="rounded-xl hover:text-pink-700 absolute right-4 top-4" title="Apagar evento" onClick={() => handlerDelete(Number(props.params.idEvento))}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-gray-800 hover:text-pink-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
      </h1>
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
                defaultValue={data?.title}
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
                defaultValue={new Date().toISOString().split('T')[0]}
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
                defaultValue={data?.address}
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
                defaultValue={data?.content}
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

export default Editar;
