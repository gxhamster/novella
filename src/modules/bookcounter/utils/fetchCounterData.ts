import { supabase } from "@/modules/auth/supabase";

async function supabaseFetch(table: string, selectParam: string) {
  const { data: record, error } = await supabase
    .from(table)
    .select(selectParam);

  if (error) {
    console.error(`Cannot fetch from ${table}: `, error);
  }

  return record?.length;
}

export async function getTotalBooks() {
  return await supabaseFetch("books", "id");
}

export async function getTotalStudents() {
  return await supabaseFetch("students", "id");
}
