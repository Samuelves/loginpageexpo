import React, {useState, useEffect} from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import {
  View, KeyboardAvoidingView, Image, TextInput,
  TouchableOpacity, Text, StyleSheet,
  Animated, Keyboard} from 'react-native';

export default function Login() {

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 95}));//Valores iniciais
  const[opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x: 1, y: 1}));

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([//Permite executar duas animações ao mesmo tempo
      Animated.spring(offset.y, {
        useNativeDriver: true,
        toValue: 0, //Vai sair de 80 para 0
        speed: 4,
        bounciness: 20, //efeito estilingue
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

  }, []);

  function keyboardDidShow(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(logo.y, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),

    ]).start();
  }

  function keyboardDidHide(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(logo.y, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }


  return (
    //KeyboardAvoidingView - Em IOS, faz a tela subir junto com teclado, não permitindo que este sobreponha-se a tela
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{ transform: [{scaleX: logo.x}, {scaleY: logo.y}]}}
          source={require('../../assets/img/icon.png')}
        />
      </View>

      <Animated.View
        style={[//será adicionado efeito neste style
          styles.container,
          {
            opacity: opacity,
            transform: [
              {translateY: offset.y}
            ]
          }
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Criar conta</Text>
        </TouchableOpacity>

      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,//Pega o tamanho inteiro da tela
    alignItems: 'center', //Alinhamento no centro
    justifyContent: 'center',
    backgroundColor: '#191919',
  },
  containerLogo:{
    flex:1,
    justifyContent: 'center', //alinha verticalmente
  },
  container:{
    flex: 1, //o container da imagem e dos inputs vão dividir o espaço entre eles
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50,
  },
  input:{
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  submitText:{
    color: '#FFF',
    fontSize: 18
  },
  btnRegister:{
    marginTop: 30,
  },
  registerText:{
    color: '#FFF',
  }
});
