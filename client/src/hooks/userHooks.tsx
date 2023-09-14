import { useMutation } from "@tanstack/react-query";
import { UserInfo } from "../types/UserInfo";
import apiClient from "../utils/apiClient";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) =>
      (
        await apiClient.post<UserInfo>(`/user/login`, {
          email,
          password,
        })
      ).data,
  });

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      avatar,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      password: string;
      avatar: string;
    }) =>
      (
        await apiClient.post<UserInfo>(`/user/register`, {
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          avatar,
        })
      ).data,
  });

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      email,
    }: {
      firstName: string;
      lastName: string;
      email: string;
    }) =>
      (
        await apiClient.put<UserInfo>(`/user/profile`, {
          firstName,
          lastName,
          email,
        })
      ).data,
  });
