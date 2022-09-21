import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, FlatList, Text } from "react-native";
import { GameParams } from "../../@types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Background } from "../../components/Background";
import { Heading } from "../../components/Header";
import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { DuoCard, DuoPropsCard } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";
import axios from "axios";

export function Game() {
  const [duo, setDuo] = useState<DuoPropsCard[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("asd");
  const { goBack } = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function handlerGoBack() {
    goBack();
  }

  async function handlerGetConnectDiscord(adsId: string) {
    axios(`${process.env.API_KEY}/ads/${adsId}/discord`).then((response) => {
      setDiscordDuoSelected(response.data.discord);
    });
  }

  useEffect(() => {
    axios(`${process.env.API_KEY}/games/${game.id}/ads`).then((response) => {
      setDuo(response.data);
    });
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handlerGoBack}>
            <Entypo
              name="chevron-thin-left"
              size={20}
              color={THEME.COLORS.CAPTION_300}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subTitle="Conecte-se e comece a jogar" />

        <FlatList
          data={duo}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => handlerGetConnectDiscord(item.id)}
            />
          )}
          style={styles.containerList}
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.textEmpty}>
              Não há ánuncios publicados ainda para este jogo.
            </Text>
          )}
        />
        <DuoMatch
          animationType="fade"
          visible={discordDuoSelected.length > 0}
          discord="GabrielJ#9876"
          onClose={() => setDiscordDuoSelected("")}
        />
      </SafeAreaView>
    </Background>
  );
}
