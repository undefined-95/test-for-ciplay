import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { isEmailValid, isPasswordValid } from "./common/validations";
import { userSliceActions } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

function SignUp() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const { setUser } = userSliceActions;

  const handleClick = () => setShow(!show);

  const handleSubmit = () => {
    if (!isEmailValid(email)) {
      toast({
        title: "Емайл некорректный",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (!isPasswordValid(password)) {
      toast({
        title: "Пароль некорректный",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Пароли не совпадают",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    const user = {
      email,
      password,
      isExpired: false,
    };
    dispatch(setUser(user));
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Почта</FormLabel>
        <Input
          value={email}
          placeholder="Введите эл. адрес"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Пароль</FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={show ? "text" : "password"}
            placeholder="Введите пароль"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button border="5rem" h="1.rem" size="sm" onClick={handleClick}>
              {show ? "скрыть" : "показать"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Повторный ввод пароля</FormLabel>
        <InputGroup>
          <Input
            value={confirmPassword}
            type={show ? "text" : "password"}
            placeholder="Повторный ввод пароля"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        onClick={handleSubmit}
        // isLoading={loading}
      >
        Зарегистрироваться
      </Button>
    </VStack>
  );
}

export default SignUp;
