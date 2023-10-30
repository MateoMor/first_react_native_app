import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import uploadToAnonymousFiles from "anonymous-files";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Función para seleccionar una imagen
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync(); // Pide permiso al usuario para acceder a las galeria de imagenes
    if (permissionResult.granted === false) {
      alert("Permission to acces camera is required");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync(); // Lanzará la galería y retornará la imagen que el usuario escogió
    //console.log(pickerResult)

    if (pickerResult.canceled == true) {
      return;
    } else {
      // Pregunta en qué plataforma está
      if (Platform.OS === "web") {
        console.log("you are in web")
      } else {
        setSelectedImage({ localUri: pickerResult.uri }); // Se guarcda la imagen en un elemento de SelectedImage llamado localUri
      }
    }
  };

  // Función para compartir la imagen
  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      // Se comprueba si el dispositivo movil tiene la api para compartir
      alert("Sharing, is not available on your platform");
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri); // Se comparte la imagen almacenada en localUri
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick an Image</Text>
      <TouchableOpacity onPress={openImagePickerAsync}>
        {
          // Crea un contenedor para habilitar el toque
        }
        <Image
          source={{
            uri:
              selectedImage != null
                ? selectedImage.localUri
                : "https://picsum.photos/200/200",
          }} // Si el valor es diferente de null que use la imagen de selectedImage
          style={styles.image}
        />
      </TouchableOpacity>
      {selectedImage ? ( // Se pregunta si hay algo en selectedImage, si lo hay muestra el botón
        <TouchableOpacity onPress={openShareDialog} style={styles.button}>
          <Text style={styles.buttonText}>Share this image</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

// Hoja de estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292929",
  },
  title: { fontSize: 30, color: "#fff" },
  image: { height: 200, width: 200, borderRadius: 100, resizeMode: "contain" },
  button: { backgroundColor: "deepskyblue", padding: 7, marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 20 },
});

export default App;
