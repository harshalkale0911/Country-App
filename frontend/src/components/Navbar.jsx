import {
  Box,
  Flex,
  Button,
  useToast,
  useDisclosure,
  HStack,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../util/vars";

const Navbar = () => {
  const Links = [
    { name: "Country", path: "/" },
    { name: "Favourite", path: "/favorite" }
    
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const result = await response.json();
      setAuth({
        isAuth: false,
        username: "",
        accessToken: "",
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");

      toast({
        title: `${result.message}`,
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });

      navigate("/login");
    } catch (error) {
      toast({
        title: `${error.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bgGradient="linear(to-r, #7928CA, #FF0080)"
      px={{ base: 4, md: 16 }}
      py={2}
      borderBottom={"1px solid #e2e8f0"}
      position={"fixed"}
      top={0}
      w={"100%"}
      zIndex={4}
      boxShadow={"lg"}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          bg={"white"}
          _hover={{ bg: "gray.200" }}
          color={"#7928CA"}
        />
        <Box
          fontSize={"2xl"}
          fontWeight={"extrabold"}
          onClick={() => navigate("/")}
          _hover={{ cursor: "pointer", color: "white", transform: "scale(1.1)" }}
          transition={"0.2s ease"}
          color={"white"}
        >
          CountryApp
        </Box>

        <HStack as={"nav"} spacing={8} display={{ base: "none", md: "flex" }}>
          {Links.map((link) => (
            <NavLink key={link.name} to={link.path} style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Box
                  fontWeight={isActive ? "bold" : "normal"}
                  color={isActive ? "white" : "gray.200"}
                  _hover={{ color: "white", transform: "scale(1.1)" }}
                  transition={"0.2s ease"}
                  py={2}
                >
                  {link.name}
                </Box>
              )}
            </NavLink>
          ))}
        </HStack>

        <Flex gap={{ base: "5px", md: "10px" }}>
          {auth.isAuth ? (
            <Button
              bg={"#FF0080"}
              _hover={{ bg: "#FF5E99" }}
              color={"white"}
              size={"sm"}
              onClick={handleLogout}
              boxShadow={"md"}
              transition={"0.2s ease"}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                bg={"#FF0080"}
                _hover={{ bg: "#FF5E99" }}
                color={"white"}
                size={"sm"}
                onClick={() => navigate("/login")}
                boxShadow={"md"}
                transition={"0.2s ease"}
              >
                Login
              </Button>
              <Button
                bg={"#FF0080"}
                _hover={{ bg: "#FF5E99" }}
                color={"white"}
                size={"sm"}
                onClick={() => navigate("/register")}
                boxShadow={"md"}
                transition={"0.2s ease"}
              >
                Register
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path} style={{ textDecoration: "none" }}>
                <Box
                  fontWeight={"bold"}
                  color={"gray.200"}
                  _hover={{ color: "white", transform: "scale(1.05)" }}
                  transition={"0.2s ease"}
                  py={2}
                >
                  {link.name}
                </Box>
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export { Navbar };
