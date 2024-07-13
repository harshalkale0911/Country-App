 import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"20px"}
      mt={24}
      mb={16}
    >
       
      <NavLink to={"/"}>
        <Button colorScheme="gray">
          <ArrowBackIcon /> Go back to Homepage
        </Button>
      </NavLink>
    </Flex>
  );
};

export { Error };