import { Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import LogoImg from "../../assets/logo-nlw-esports.png";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export function Home() {
  const { navigate } = useNavigation();
  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    axios(`${process.env.API_KEY}/games`).then((response) => {
      setGames(response.data);
    });
  }, []);

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigate("game", { id, title, bannerUrl });
  }
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={LogoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo!"
          subTitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
