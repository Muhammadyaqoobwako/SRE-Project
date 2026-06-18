VERSION 5.00
Begin VB.Form Form5 
   Caption         =   "Form5"
   ClientHeight    =   9330
   ClientLeft      =   120
   ClientTop       =   465
   ClientWidth     =   13950
   LinkTopic       =   "Form5"
   ScaleHeight     =   10950
   ScaleWidth      =   20250
   StartUpPosition =   3  'Windows Default
   WindowState     =   2  'Maximized
   Begin VB.Frame Frame1 
      BackColor       =   &H000040C0&
      Height          =   10935
      Left            =   0
      TabIndex        =   0
      Top             =   0
      Width           =   20295
      Begin VB.Frame Frame3 
         BackColor       =   &H000040C0&
         Height          =   1215
         Left            =   120
         TabIndex        =   13
         Top             =   9000
         Width           =   9615
         Begin VB.CommandButton Command1 
            Caption         =   "Exit"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   9.75
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   495
            Left            =   7200
            TabIndex        =   20
            Top             =   360
            Width           =   1935
         End
         Begin VB.CommandButton cmdExit 
            Caption         =   "Exit"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   615
            Left            =   720
            TabIndex        =   18
            Top             =   5280
            Width           =   2055
         End
         Begin VB.CommandButton cmdDelete 
            Caption         =   "Clear Menu"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   615
            Left            =   720
            TabIndex        =   17
            Top             =   4080
            Width           =   2055
         End
         Begin VB.CommandButton cmdUpdate 
            Caption         =   "Update Menu"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   615
            Left            =   4800
            TabIndex        =   16
            Top             =   240
            Width           =   2055
         End
         Begin VB.CommandButton cmdSave 
            Caption         =   "Order IceCream"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   615
            Left            =   2520
            TabIndex        =   15
            Top             =   240
            Width           =   2055
         End
         Begin VB.CommandButton cmdAddNew 
            BackColor       =   &H000000FF&
            Caption         =   "AddNew Order"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   615
            Left            =   240
            TabIndex        =   14
            Top             =   240
            Width           =   2055
         End
      End
      Begin VB.PictureBox Picture2 
         Height          =   3135
         Left            =   8160
         Picture         =   "Form5.frx":0000
         ScaleHeight     =   3075
         ScaleWidth      =   4755
         TabIndex        =   3
         Top             =   240
         Width           =   4815
      End
      Begin VB.Frame Frame2 
         BackColor       =   &H000040C0&
         Caption         =   "IceCream City"
         BeginProperty Font 
            Name            =   "Comic Sans MS"
            Size            =   11.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         ForeColor       =   &H00FF00FF&
         Height          =   5415
         Left            =   120
         TabIndex        =   2
         Top             =   3600
         Width           =   8295
         Begin VB.ComboBox Combo1 
            Height          =   315
            ItemData        =   "Form5.frx":170E7
            Left            =   3840
            List            =   "Form5.frx":170F7
            TabIndex        =   19
            Top             =   3840
            Width           =   3855
         End
         Begin VB.ComboBox cboDescription 
            DataField       =   "Description"
            DataMember      =   "IceCream"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form5.frx":1710F
            Left            =   3960
            List            =   "Form5.frx":17119
            TabIndex        =   12
            Top             =   1080
            Width           =   3855
         End
         Begin VB.ComboBox cboCashier 
            DataField       =   "Cashier"
            DataMember      =   "IceCream"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form5.frx":17128
            Left            =   3960
            List            =   "Form5.frx":1712F
            TabIndex        =   11
            Top             =   4800
            Width           =   3855
         End
         Begin VB.ComboBox cboColour 
            DataField       =   "Colour"
            DataMember      =   "IceCream"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form5.frx":17143
            Left            =   3960
            List            =   "Form5.frx":17150
            TabIndex        =   10
            Top             =   2040
            Width           =   3855
         End
         Begin VB.ComboBox cboFlavour 
            DataField       =   "Flavour"
            DataMember      =   "IceCream"
            DataSource      =   "DataEnvironment1"
            Height          =   315
            ItemData        =   "Form5.frx":17169
            Left            =   3960
            List            =   "Form5.frx":17176
            TabIndex        =   9
            Top             =   2880
            Width           =   3855
         End
         Begin VB.Label Label5 
            BackColor       =   &H000040C0&
            Caption         =   "Cashier"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Left            =   480
            TabIndex        =   8
            Top             =   4920
            Width           =   1335
         End
         Begin VB.Label Label4 
            BackColor       =   &H000040C0&
            Caption         =   "Price"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Left            =   480
            TabIndex        =   7
            Top             =   3840
            Width           =   1335
         End
         Begin VB.Label Label3 
            BackColor       =   &H000040C0&
            Caption         =   "Flavour"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Left            =   480
            TabIndex        =   6
            Top             =   2760
            Width           =   1215
         End
         Begin VB.Label Label2 
            BackColor       =   &H000040C0&
            Caption         =   "Colour"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Left            =   480
            TabIndex        =   5
            Top             =   1920
            Width           =   1215
         End
         Begin VB.Label Label1 
            BackColor       =   &H000040C0&
            Caption         =   "Description"
            BeginProperty Font 
               Name            =   "Comic Sans MS"
               Size            =   11.25
               Charset         =   0
               Weight          =   700
               Underline       =   0   'False
               Italic          =   0   'False
               Strikethrough   =   0   'False
            EndProperty
            Height          =   375
            Left            =   480
            TabIndex        =   4
            Top             =   960
            Width           =   1215
         End
      End
      Begin VB.PictureBox Picture1 
         Height          =   3135
         Left            =   240
         Picture         =   "Form5.frx":17198
         ScaleHeight     =   3075
         ScaleWidth      =   7875
         TabIndex        =   1
         Top             =   360
         Width           =   7935
      End
   End
End
Attribute VB_Name = "Form5"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private Sub cmdAddNew_Click()
DataEnvironment1.rsIceCream.AddNew

End Sub

Private Sub cmdDelete_Click()
DataEnvironment1.rsIceCream.Delete
MsgBox "The IceCream Menu has been cleared"
End Sub

Private Sub cmdExit_Click()
MDIForm1.Show
Unload Me

End Sub

Private Sub cmdSave_Click()
DataEnvironment1.rsIceCream.AddNew
MsgBox "The Order has been made"
End Sub

Private Sub cmdUpdate_Click()
DataEnvironment1.rsIceCream.Update
MsgBox "The Menu has been Updated"
End Sub

Private Sub Command1_Click()
MDIForm1.Show
Unload Me
End Sub
