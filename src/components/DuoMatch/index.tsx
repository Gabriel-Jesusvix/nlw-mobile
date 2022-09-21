import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Modal, ModalProps, Text, TouchableOpacity } from "react-native";
import { CheckCircle } from "phosphor-react-native";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../Header";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  return (
    <Modal {...rest} transparent statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading
            title="Let's play!"
            subTitle="Agora é só começar a jogar!"
            style={{
              alignItems: "center",
              marginTop: 24,
            }}
          />
          <Text style={styles.label}> Adicione no discord</Text>
          <TouchableOpacity style={styles.buttonDiscord}>
            <Text style={styles.dicord}>{discord}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
