import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import Button from "../../components/Button";
import Card from "../../components/Card";
import TextField from "../../components/TextField";
import { Announcement } from "../../types/apiTypes";
import { formatMoney, formatType } from "../../utils/FormatData";

const Home = () => {
  const [announcements, setAnnouncements] = useState([])

  const getAnnouncements = async () => {
    const {data} = await axios.get("https://imobiliaria-ev.vercel.app/api/anuncios/");
    setAnnouncements(data)
  }

  useEffect(() => {
    getAnnouncements()
  }, [])

  return (
    <ScrollView >
      <View style={{ marginVertical: 20, marginHorizontal: 16, alignItems: "center", flex: 1 }}>
        {announcements.map((announcement: Announcement) => (
          <Card
            key={announcement.id}
            title={announcement.titulo} 
            type={formatType(announcement.tipo)} 
            price={formatMoney(announcement.valor)} 
            link={`${announcement.id}`}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default Home;