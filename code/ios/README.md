# Application PhoneGap iOS

Ceci est le projet Apple Xcode de l'application Ohtannenbaum.

# Pré-requis

Intel-based computer with Mac OS X Snow Leopard (10.6) or Lion

# Compilation du projet

Pour compiler le projet il est nécessaire de posséder les éléments suivantsö

 1. Télécharger et installer le logiciel Apple Xcode 4.x et le SDK iOS 5 depuis le [Apple developer portal](http://developer.apple.com/).
 2. Télécharger [PhoneGap 1.4 (Apache Callback)](http://phonegap.com/download) et l'installer (depuis le .dmg iOS/PhoneGap-1.2.0.dmg)
 3. Créer un lien symbolique vers le dossier www:

    $ cd code/ios
    $ ln -s ../mobile ./www


# Utilisation du service PhoneGap Build

Pour simplifier la création des applications native, PhoneGap/Nitobi propose un service hosté nommé [PhoneGap:Build](https://build.phonegap.com).

Comme décris sur [cette page](https://build.phonegap.com/docs/git-hosting), il est possible générer les builds en utilisant git.


## Création d'une branche dédiée

Pour cela, nous devons créer une branche contenant uniquement le dossier `code/mobile`. Il est possible d'effectuer cette opération en utilisant [git-subtree](https://github.com/apenwarr/git-subtree/):

    git subtree split -P <folder> -b <target-branch> <origin-branch>


Pour créer une branche nommée `deploy` contenant le dossier `code/mobile` basé sur la branche `master` il faut utilisé la commande suivante:

    $ git subtree split -P code/mobile -b deploy master

