import { Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import LogoImg from "../../assets/logo-nlw-esports.png";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const { navigate } = useNavigation();
  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    fetch("http://192.168.1.105:3000/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
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