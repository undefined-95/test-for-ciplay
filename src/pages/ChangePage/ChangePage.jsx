import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { userSliceActions } from "../../redux/slices/userSlice";

export const ChangePage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.userSlice);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const dispatch = useDispatch();
  const { setUser } = userSliceActions;

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleClick = () => setShow(!show);

  const savedUser = localStorage.getItem("user");
  console.log(savedUser);

  const submitHandler = (submitHandler) => {
    const savedUser = localStorage.getItem("user");
    const parsedUser = savedUser ? JSON.parse(savedUser) : {};
    if (
      String(oldPassword) ==
      String(
        parsedUser?.password && String(parsedUser?.password) === newPassword
      )
    ) {
      toast({
        title: "Пароль успешно изменен",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    localStorage.setItem(
      "user",
      JSON.stringify({ ...parsedUser, password: newPassword })
    );
    dispatch(setUser({ ...parsedUser, password: newPassword }));
  };

  const { logout } = useLogout({
    onSuccess: () => {
      navigate("/");
    },
  });

  return (
    <Container>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px "
      >
        <VStack spacing="5px">
          <FormControl id="email" isRequired>
            <FormLabel>Старый пароль</FormLabel>
            <Input
              value={oldPassword}
              placeholder="Введите эл. адрес"
              onChange={handleOldPassword}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Новый пароль</FormLabel>
            <InputGroup>
              <Input
                value={password}
                type={show ? "text" : "password"}
                placeholder="Введите пароль"
                onChange={handlePassword}
              />
              <InputRightElement width="4.5rem">
                <Button border="5rem" h="1.rem" size="sm" onClick={handleClick}>
                  {show ? "скрыть" : "показать"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Подтвердите новый пароль</FormLabel>
            <InputGroup>
              <Input
                value={newPassword}
                type={show ? "text" : "password"}
                placeholder="Подтвердите пароль"
                onChange={handleNewPassword}
              />
              <InputRightElement width="4.5rem">
                <Button border="5rem" h="1.rem" size="sm" onClick={handleClick}>
                  {show ? "скрыть" : "показать"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
          >
            Подтвердить
          </Button>
          <Button
            colorScheme="red"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={() => logout()}
          >
            Выход
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};
