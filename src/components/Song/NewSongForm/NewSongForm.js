import React, { useState, useCallback, useEffect } from "react";
import { Form, Icon } from "semantic-ui-react";
import classNames from "classnames";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { map } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Song, Album, Storage } from "../../../api";
import { initialValues, validationSchema } from "./NewSongForm.data";
import "./NewSongForm.scss";

const songController = new Song();
const albumController = new Album();
const storageController = new Storage();

export function NewSongForm({ onClose }) {
  const [songName, setSongName] = useState("");
  const [albumsOptions, setAlbumsOptions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await albumController.readAll();
        const newData = map(response, (album) => ({
          key: album.id,
          value: album.id,
          text: album.name,
        }));
        setAlbumsOptions(newData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { file, name, album } = formValue;
        const response = await storageController.uploadFile(
          file,
          "song",
          uuidv4()
        );
        const url = await storageController.getURLFile(
          response.metadata.fullPath
        );
        await songController.create(name, album, url);
        onClose();
      } catch (error) {
        throw error;
      }
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    setSongName(file.name);
    formik.setFieldValue("file", file);
    formik.setFieldValue("name", file.name);
  });

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Form className="add-song-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        placeholder="Nombre de la caci??n"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Dropdown
        placeholder="Asigna la canci??n a un ??lbum"
        fluid
        search
        selection
        options={albumsOptions}
        value={formik.values.album}
        onChange={(_, data) => formik.setFieldValue("album", data.value)}
        error={formik.errors.album}
      />

      <div
        {...getRootProps()}
        className={classNames("add-song-form__file", {
          error: formik.errors.file,
        })}
      >
        <input {...getInputProps()} />
        <Icon name="cloud upload" />
        <div>
          <p>
            Arrastra tu cacnci??n o haz click <span>aqu??</span>
          </p>
          {songName && <p className="song-name">{songName}</p>}
        </div>
      </div>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Subir canci??n
      </Form.Button>
    </Form>
  );
}
