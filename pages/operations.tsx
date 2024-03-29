import type { NextPage, GetStaticProps, GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "../components/layout";
import requireAuthentication from "../components/hoc/requireAuthentication";

import { EditableTable } from "../components/tables";
import { Flex, Box, Text, Spinner, Center } from "@chakra-ui/react";

import dbConnect from "../lib/mongodb";
import swords from "../models/swords";

import { fixUnserialized } from "../tools/general";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/toast";
import { toastError, toastSuccess, toastWarning } from "../tools/toasts";
/*----------------------------------------------------------------*/
const Operations = ({ props }: any) => {
  const toast = useToast();

  const headers = ["Name", "Material", "Type", "Quality", "", ""];
  const rows = props.map((e) => {
    return {
      name: e.name,
      material: e.material,
      type: e.type,
      quality: e.quality,
      id: e._id,
    };
  });
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath, undefined, { scroll: false });
  };

  const deleteRecord = async (id) => {
    // setLoading(true);
    // setLoginStatus(0);
    const response = await fetch("/api/swords", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    const res = await response.status;
    if (res === 200) {
      toast({ ...toastWarning, description: "Sword Deleted!" });
    } else {
      toast({ ...toastError, description: "Database Error!" });
    }
    refreshData();
  };

  const createRecord = async (name, material, type, quality) => {
    const response = await fetch("/api/swords", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        material,
        type,
        quality,
      }),
    });
    const res = await response.status;
    if (res === 200) {
      toast({ ...toastSuccess, description: "Sword created!" });
    } else if (res === 409) {
      toast({ ...toastError, description: "Sword already exists!" });
    } else {
      toast({ ...toastError, description: "Database Error!" });
    }
    refreshData();
  };

  const editRecord = async (id, name, material, type, quality) => {
    const response = await fetch("/api/swords", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        material,
        type,
        quality,
      }),
    });
    const res = await response.status;
    if (res === 200) {
      toast({ ...toastSuccess, description: "Sword Edited!" });
    } else if (res === 409) {
      toast({ ...toastError, description: "Sword already exists!" });
    } else {
      toast({ ...toastError, description: "Database Error!" });
    }
    refreshData();
  };

  return (
    <Layout>
      <Flex direction={"column"} alignItems={"center"}>
        <Box
          m={25}
          mt={120}
          p={2}
          borderWidth="1px"
          borderRadius="lg"
          width={"75%"}
        >
          <EditableTable
            headers={headers}
            rows={rows}
            editFunc={editRecord}
            deleteFunc={deleteRecord}
            createFunc={createRecord}
            loading={false}
          />
        </Box>
      </Flex>
    </Layout>
  );
};

export default Operations;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context) => {
    await dbConnect();
    const data = await swords.find();
    return {
      props: { props: fixUnserialized(data) },
    };
  }
);
