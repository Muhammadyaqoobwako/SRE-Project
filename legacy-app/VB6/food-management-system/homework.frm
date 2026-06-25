VERSION 5.00
Object = "{67397AA1-7FB1-11D0-B148-00A0C922E820}#6.0#0"; "MSADODC.OCX"
Begin VB.Form Form1 
   Caption         =   "Form1"
   ClientHeight    =   7380
   ClientLeft      =   120
   ClientTop       =   465
   ClientWidth     =   18075
   LinkTopic       =   "Form1"
   ScaleHeight     =   7380
   ScaleWidth      =   18075
   Begin MSAdodcLib.Adodc Adodc1 
      Height          =   735
      Left            =   13560
      Top             =   5760
      Width           =   1200
      _ExtentX        =   2117
      _ExtentY        =   1296
      ConnectMode     =   0
      CursorLocation  =   3
      IsolationLevel  =   -1
      ConnectionTimeout=   15
      CommandTimeout  =   30
      CursorType      =   3
      LockType        =   3
      CommandType     =   2
      CursorOptions   =   0
      CacheSize       =   50
      MaxRecords      =   0
      BOFAction       =   0
      EOFAction       =   0
      ConnectStringType=   1
      Appearance      =   1
      BackColor       =   -2147483643
      ForeColor       =   -2147483640
      Orientation     =   0
      Enabled         =   -1
      Connect         =   "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\Users\ONIBUKUN\Desktop\vb class\bat\bat.mdb;Persist Security Info=False"
      OLEDBString     =   "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\Users\ONIBUKUN\Desktop\vb class\bat\bat.mdb;Persist Security Info=False"
      OLEDBFile       =   ""
      DataSourceName  =   ""
      OtherAttributes =   ""
      UserName        =   ""
      Password        =   ""
      RecordSource    =   "customer"
      Caption         =   "Adodc1"
      BeginProperty Font {0BE35203-8F91-11CE-9DE3-00AA004BB851} 
         Name            =   "MS Sans Serif"
         Size            =   8.25
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      _Version        =   393216
   End
   Begin VB.Frame Frame1 
      Height          =   7815
      Left            =   1080
      TabIndex        =   0
      Top             =   1080
      Width           =   11415
      Begin VB.CommandButton Command2 
         Caption         =   "Command2"
         Height          =   615
         Left            =   7320
         TabIndex        =   35
         Top             =   6960
         Width           =   1215
      End
      Begin VB.CommandButton Command1 
         Caption         =   "UPDATE"
         Height          =   615
         Left            =   7320
         TabIndex        =   30
         Top             =   5640
         Width           =   1215
      End
      Begin VB.CommandButton Command12 
         Caption         =   "update"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   15.75
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   615
         Left            =   7320
         TabIndex        =   8
         Top             =   4320
         Width           =   1215
      End
      Begin VB.CommandButton Command11 
         Caption         =   "update"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   15.75
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   555
         Left            =   7200
         TabIndex        =   7
         Top             =   3240
         Width           =   1215
      End
      Begin VB.CommandButton Command10 
         Caption         =   "update"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   15.75
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   735
         Left            =   7200
         TabIndex        =   6
         Top             =   2040
         Width           =   1095
      End
      Begin VB.CommandButton Command9 
         Caption         =   "update"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   15.75
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   615
         Left            =   7200
         TabIndex        =   5
         Top             =   720
         Width           =   1095
      End
      Begin VB.Line Line9 
         X1              =   120
         X2              =   11400
         Y1              =   6840
         Y2              =   6840
      End
      Begin VB.Line Line8 
         X1              =   0
         X2              =   11400
         Y1              =   5520
         Y2              =   5400
      End
      Begin VB.Label Label29 
         Caption         =   "Label29"
         Height          =   615
         Left            =   5640
         TabIndex        =   34
         Top             =   7080
         Width           =   975
      End
      Begin VB.Label Label28 
         Caption         =   "1"
         BeginProperty Font 
            Name            =   "News706 BT"
            Size            =   20.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   -1  'True
            Strikethrough   =   0   'False
         EndProperty
         Height          =   615
         Left            =   4320
         TabIndex        =   33
         Top             =   7080
         Width           =   495
      End
      Begin VB.Label Label27 
         Caption         =   "kim jon wu"
         BeginProperty Font 
            Name            =   "News706 BT"
            Size            =   8.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   375
         Left            =   1920
         TabIndex        =   32
         Top             =   7200
         Width           =   1215
      End
      Begin VB.Label Label26 
         Caption         =   "room 6"
         BeginProperty Font 
            Name            =   "News706 BT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   495
         Left            =   480
         TabIndex        =   31
         Top             =   7200
         Width           =   855
      End
      Begin VB.Label Label25 
         Caption         =   "Label25"
         Height          =   495
         Left            =   5760
         TabIndex        =   29
         Top             =   5880
         Width           =   975
      End
      Begin VB.Label Label24 
         Caption         =   "10"
         BeginProperty Font 
            Name            =   "News706 BT"
            Size            =   20.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   -1  'True
            Strikethrough   =   0   'False
         EndProperty
         Height          =   495
         Left            =   4200
         TabIndex        =   28
         Top             =   5880
         Width           =   615
      End
      Begin VB.Label Label23 
         Caption         =   "president trump"
         BeginProperty Font 
            Name            =   "News706 BT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   255
         Left            =   1800
         TabIndex        =   27
         Top             =   6000
         Width           =   1935
      End
      Begin VB.Label Label22 
         Caption         =   "room 5"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   375
         Left            =   240
         TabIndex        =   26
         Top             =   6000
         Width           =   975
      End
      Begin VB.Label Label16 
         Caption         =   "2"
         BeginProperty Font 
            Name            =   "News706 BT"
            Size            =   14.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   -1  'True
            Strikethrough   =   0   'False
         EndProperty
         Height          =   375
         Left            =   5640
         TabIndex        =   20
         Top             =   960
         Width           =   615
      End
      Begin VB.Label Label15 
         Caption         =   "1"
         BeginProperty Font 
            Name            =   "News706 BT"
            Size            =   14.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   -1  'True
            Strikethrough   =   0   'False
         EndProperty
         Height          =   615
         Left            =   5640
         TabIndex        =   19
         Top             =   2280
         Width           =   975
      End
      Begin VB.Label Label14 
         Caption         =   "2"
         BeginProperty Font 
            Name            =   "News706 BT"
            Size            =   14.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   -1  'True
            Strikethrough   =   0   'False
         EndProperty
         Height          =   615
         Left            =   5760
         TabIndex        =   18
         Top             =   3360
         Width           =   855
      End
      Begin VB.Label Label13 
         Caption         =   "2"
         Height          =   495
         Left            =   5760
         TabIndex        =   17
         Top             =   4560
         Width           =   495
      End
      Begin VB.Label Label12 
         Caption         =   "8"
         BeginProperty Font 
            Name            =   "News706 BT"
            Size            =   20.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   -1  'True
            Strikethrough   =   0   'False
         EndProperty
         Height          =   495
         Left            =   4320
         TabIndex        =   16
         Top             =   4440
         Width           =   375
      End
      Begin VB.Label Label11 
         Caption         =   "2"
         BeginProperty Font 
            Name            =   "News706 BT"
            Size            =   20.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   375
         Left            =   4440
         TabIndex        =   15
         Top             =   3360
         Width           =   255
      End
      Begin VB.Label Label10 
         Caption         =   "5"
         BeginProperty Font 
            Name            =   "News706 BT"
            Size            =   20.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   -1  'True
            Strikethrough   =   0   'False
         EndProperty
         Height          =   495
         Left            =   4320
         TabIndex        =   14
         Top             =   2280
         Width           =   375
      End
      Begin VB.Label Label9 
         Caption         =   "3"
         BeginProperty Font 
            Name            =   "News706 BT"
            Size            =   18
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   -1  'True
            Strikethrough   =   0   'False
         EndProperty
         Height          =   375
         Left            =   4200
         TabIndex        =   13
         Top             =   960
         Width           =   375
      End
      Begin VB.Label Label8 
         Caption         =   "president xi"
         BeginProperty Font 
            Name            =   "News706 BT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   375
         Left            =   1920
         TabIndex        =   12
         Top             =   4560
         Width           =   1815
      End
      Begin VB.Label Label7 
         Caption         =   "president putin"
         BeginProperty Font 
            Name            =   "News706 BT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   375
         Left            =   1920
         TabIndex        =   11
         Top             =   3480
         Width           =   1815
      End
      Begin VB.Label head_reg2 
         DataField       =   "name"
         DataSource      =   "Adodc1"
         BeginProperty Font 
            Name            =   "News706 BT"
            Size            =   12
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   375
         Index           =   1
         Left            =   2040
         TabIndex        =   10
         Top             =   2280
         WhatsThisHelpID =   2
         Width           =   1815
      End
      Begin VB.Label head_name1 
         Caption         =   "Elon musk"
         DataField       =   "name"
         DataSource      =   "Adodc1"
         BeginProperty Font 
            Name            =   "News706 BT"
            Size            =   14.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   375
         Left            =   2160
         TabIndex        =   9
         Top             =   960
         Width           =   1695
      End
      Begin VB.Line Line7 
         X1              =   120
         X2              =   11400
         Y1              =   4080
         Y2              =   4080
      End
      Begin VB.Line Line6 
         X1              =   120
         X2              =   11400
         Y1              =   2880
         Y2              =   3000
      End
      Begin VB.Line Line5 
         X1              =   0
         X2              =   11280
         Y1              =   1680
         Y2              =   1680
      End
      Begin VB.Line Line4 
         X1              =   6840
         X2              =   6840
         Y1              =   120
         Y2              =   7800
      End
      Begin VB.Line Line3 
         X1              =   5280
         X2              =   5280
         Y1              =   120
         Y2              =   7920
      End
      Begin VB.Line Line2 
         X1              =   3960
         X2              =   3960
         Y1              =   120
         Y2              =   12225
      End
      Begin VB.Line Line1 
         X1              =   1800
         X2              =   1680
         Y1              =   120
         Y2              =   7800
      End
      Begin VB.Label Label4 
         Caption         =   "room 4"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   15.75
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   615
         Left            =   360
         TabIndex        =   4
         Top             =   4560
         Width           =   1215
      End
      Begin VB.Label Label3 
         Caption         =   "room 3"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   15.75
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   495
         Left            =   360
         TabIndex        =   3
         Top             =   3360
         Width           =   1095
      End
      Begin VB.Label room2 
         Caption         =   "room 2"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   15.75
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   495
         Left            =   480
         TabIndex        =   2
         Top             =   2160
         Width           =   1815
      End
      Begin VB.Label room1 
         Caption         =   "room 1"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   15.75
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   495
         Left            =   360
         TabIndex        =   1
         Top             =   840
         Width           =   1095
      End
   End
   Begin VB.Label Label21 
      Caption         =   "Label21"
      Height          =   495
      Left            =   9600
      TabIndex        =   25
      Top             =   720
      Width           =   2295
   End
   Begin VB.Label Label20 
      Caption         =   "nos in a room"
      Height          =   375
      Left            =   5880
      TabIndex        =   24
      Top             =   720
      Width           =   1455
   End
   Begin VB.Label Label19 
      Caption         =   "days "
      Height          =   375
      Left            =   4680
      TabIndex        =   23
      Top             =   720
      Width           =   1335
   End
   Begin VB.Label Label18 
      Caption         =   "head name"
      Height          =   495
      Left            =   2760
      TabIndex        =   22
      Top             =   840
      Width           =   1695
   End
   Begin VB.Label Label17 
      Caption         =   "room nos"
      Height          =   375
      Left            =   720
      TabIndex        =   21
      Top             =   840
      Width           =   1335
   End
End
Attribute VB_Name = "Form1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private Sub Command10_Click()
Form3.Show
Form2.Show


Form2.head_namereg.Text = Me.head_reg2.Caption

End Sub

Private Sub Command12_Click()
Form3.Show
End Sub

Private Sub Command9_Click()
Form2.Show
Form2.head_namereg.Text = Me.head_name1.Caption

End Sub


