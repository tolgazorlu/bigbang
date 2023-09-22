import { useMutation, useQuery } from "@tanstack/react-query";
import { UserInfo } from "../types/UserInfo";
import apiClient from "../utils/apiClient";
import { User } from "../types/User";

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
    }: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      password: string;
    }) =>
      (
        await apiClient.post<UserInfo>(`/user/register`, {
          firstName,
          lastName,
          email,
          phoneNumber,
          password
        })
      ).data,
  });

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      email,
      avatar,
      phoneNumber
    }: {
      firstName: string;
      lastName: string;
      email: string;
      avatar: string;
      phoneNumber: string;
    }) =>
      (
        await apiClient.put<UserInfo>(`/user/profile`, {
          firstName,
          lastName,
          email,
          avatar,
          phoneNumber
        })
      ).data,
  });

export const useGetUsersQuery = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: async () => (await apiClient.get<User[]>(`user/all`)).data,
  });

  export const useDeleteUserMutation = () =>
  useMutation({
    mutationFn: async (userId: string) =>
      (await apiClient.delete<{ message: string, user: User[] }>(`user/${userId}`)).data,
  })