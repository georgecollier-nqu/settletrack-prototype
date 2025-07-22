import { useState, useCallback } from "react";
import { ExtractedField, EditFieldData, EditValues } from "@/types/case";

export function useEditField() {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editFieldData, setEditFieldData] = useState<EditFieldData | null>(
    null,
  );
  const [editValues, setEditValues] = useState<EditValues>({
    value: "",
    document: "",
    page: "",
    text: "",
  });

  const handleEdit = useCallback(
    (
      field: string,
      label: string,
      data: ExtractedField,
      fieldType: string = "text",
    ) => {
      setEditFieldData({
        field,
        label,
        currentValue: data.value,
        currentSource: data.source,
        fieldType,
      });
      setEditValues({
        value: data.value || "",
        document: data.source.document,
        page: data.source.page.toString(),
        text: data.source.text,
      });
      setShowEditDialog(true);
    },
    [],
  );

  const handleSaveEdit = useCallback(() => {
    console.log("Saving edit:", editFieldData?.field, editValues);
    // TODO: API call to save edit
    setShowEditDialog(false);
    setEditFieldData(null);
  }, [editFieldData?.field, editValues]);

  const closeDialog = useCallback(() => {
    setShowEditDialog(false);
    setEditFieldData(null);
  }, []);

  return {
    showEditDialog,
    editFieldData,
    editValues,
    setEditValues,
    handleEdit,
    handleSaveEdit,
    closeDialog,
  };
}
